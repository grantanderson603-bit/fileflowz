import { ENV } from "./env";

export type Role = "system" | "user" | "assistant";

export type Message = {
  role: Role;
  content: string;
};

export type Tool = {
  type: "function";
  function: {
    name: string;
    description?: string;
    parameters?: Record<string, unknown>;
  };
};

export type LLMProvider = "openai" | "anthropic" | "gemini" | "perplexity";

export type InvokeParams = {
  messages: Message[];
  tools?: Tool[];
  provider?: LLMProvider;
  model?: string;
  maxTokens?: number;
  temperature?: number;
};

export type ToolCall = {
  id: string;
  type: "function";
  function: {
    name: string;
    arguments: string;
  };
};

export type InvokeResult = {
  id?: string;
  model: string;
  content: string;
  toolCalls?: ToolCall[];
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
};

async function invokeOpenAI(params: InvokeParams): Promise<InvokeResult> {
  const model = params.model || "gpt-4o";
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ENV.openaiApiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: params.messages,
      max_tokens: params.maxTokens || 4096,
      temperature: params.temperature ?? 0.7,
      tools: params.tools,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenAI error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const choice = data.choices[0];
  const toolCalls = choice.message.tool_calls?.map((tc: any) => ({
    id: tc.id,
    type: "function",
    function: {
      name: tc.function.name,
      arguments: tc.function.arguments,
    },
  }));

  return {
    id: data.id,
    model: data.model,
    content: choice.message.content || "",
    toolCalls,
    usage: data.usage
      ? {
          promptTokens: data.usage.prompt_tokens,
          completionTokens: data.usage.completion_tokens,
          totalTokens: data.usage.total_tokens,
        }
      : undefined,
  };
}

async function invokeAnthropic(params: InvokeParams): Promise<InvokeResult> {
  const model = params.model || "claude-opus-4-1-20250805";

  // Anthropic separates system messages
  const systemMsg = params.messages.find((m) => m.role === "system");
  const nonSystemMsgs = params.messages.filter((m) => m.role !== "system");

  const body: Record<string, unknown> = {
    model,
    max_tokens: params.maxTokens || 4096,
    temperature: params.temperature ?? 0.7,
    messages: nonSystemMsgs.map((m) => ({
      role: m.role,
      content: m.content,
    })),
  };

  if (systemMsg) {
    body.system = systemMsg.content;
  }

  if (params.tools && params.tools.length > 0) {
    body.tools = params.tools;
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ENV.anthropicApiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Anthropic error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const textBlock = data.content?.find((b: any) => b.type === "text");
  const toolBlocks = data.content?.filter((b: any) => b.type === "tool_use");

  const toolCalls = toolBlocks?.map((b: any) => ({
    id: b.id,
    type: "function",
    function: {
      name: b.name,
      arguments: JSON.stringify(b.input),
    },
  }));

  return {
    model: data.model,
    content: textBlock?.text || "",
    toolCalls,
    usage: data.usage
      ? {
          promptTokens: data.usage.input_tokens,
          completionTokens: data.usage.output_tokens,
          totalTokens: (data.usage.input_tokens || 0) + (data.usage.output_tokens || 0),
        }
      : undefined,
  };
}

async function invokeGemini(params: InvokeParams): Promise<InvokeResult> {
  const model = params.model || "gemini-2.5-flash";

  // Gemini uses a different message format
  const systemMsg = params.messages.find((m) => m.role === "system");
  const nonSystemMsgs = params.messages.filter((m) => m.role !== "system");

  const contents = nonSystemMsgs.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const body: Record<string, unknown> = {
    contents,
    generationConfig: {
      maxOutputTokens: params.maxTokens || 4096,
      temperature: params.temperature ?? 0.7,
    },
  };

  if (systemMsg) {
    body.systemInstruction = {
      parts: [{ text: systemMsg.content }],
    };
  }

  if (params.tools && params.tools.length > 0) {
    body.tools = [
      {
        functionDeclarations: params.tools.map((t) => t.function),
      },
    ];
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${ENV.geminiApiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const candidate = data.candidates?.[0];
  const textPart = candidate?.content?.parts?.find((p: any) => p.text)?.text || "";
  const functionCallParts = candidate?.content?.parts?.filter((p: any) => p.functionCall);

  const toolCalls = functionCallParts?.map((p: any, idx: number) => ({
    id: `call_${idx}`,
    type: "function",
    function: {
      name: p.functionCall.name,
      arguments: JSON.stringify(p.functionCall.args || {}),
    },
  }));

  return {
    model,
    content: textPart,
    toolCalls,
  };
}

async function invokePerplexity(params: InvokeParams): Promise<InvokeResult> {
  const model = params.model || "sonar";

  const response = await fetch("https://api.perplexity.ai/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ENV.perplexityApiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: params.messages,
      max_tokens: params.maxTokens || 4096,
      temperature: params.temperature ?? 0.7,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Perplexity error ${response.status}: ${err}`);
  }

  const data = await response.json();
  return {
    model: data.model,
    content: data.choices[0]?.message?.content || "",
    usage: data.usage
      ? {
          promptTokens: data.usage.prompt_tokens,
          completionTokens: data.usage.completion_tokens,
          totalTokens: data.usage.total_tokens,
        }
      : undefined,
  };
}

// Determine the best available provider
function getDefaultProvider(): LLMProvider {
  if (ENV.openaiApiKey) return "openai";
  if (ENV.anthropicApiKey) return "anthropic";
  if (ENV.geminiApiKey) return "gemini";
  if (ENV.perplexityApiKey) return "perplexity";
  throw new Error(
    "No LLM API key configured. Set OPENAI_API_KEY, ANTHROPIC_API_KEY, GEMINI_API_KEY, or PERPLEXITY_API_KEY."
  );
}

export async function invokeLLM(params: InvokeParams): Promise<InvokeResult> {
  const provider = params.provider || getDefaultProvider();

  switch (provider) {
    case "openai":
      return invokeOpenAI(params);
    case "anthropic":
      return invokeAnthropic(params);
    case "gemini":
      return invokeGemini(params);
    case "perplexity":
      return invokePerplexity(params);
    default:
      throw new Error(`Unknown LLM provider: ${provider}`);
  }
}
