/**
 * Notification service for sending notifications to users
 * Can be integrated with SendGrid, Resend, Slack, or other notification services
 */

export type NotificationPayload = {
  title: string;
  content: string;
  channel?: "email" | "webhook" | "in-app" | "slack";
  urgency?: "low" | "normal" | "high";
};

/**
 * Send a notification to the user
 * Currently logs to console; integrate with your preferred notification service
 *
 * @param payload - Notification data
 */
export async function sendNotification(payload: NotificationPayload): Promise<void> {
  const timestamp = new Date().toISOString();
  const urgencyLabel = payload.urgency ? `[${payload.urgency.toUpperCase()}]` : "";

  console.log(
    `[${timestamp}] ${urgencyLabel} Notification${
      payload.channel ? ` (${payload.channel})` : ""
    }: ${payload.title}`
  );
  console.log(`  ${payload.content}`);

  // TODO: Integrate with your preferred notification service:
  // - SendGrid for email notifications
  // - Resend for transactional email
  // - Slack webhook for team notifications
  // - Database for in-app notifications
  // - Custom webhook for external systems

  // Example integration with SendGrid:
  // if (payload.channel === 'email') {
  //   const sgMail = require('@sendgrid/mail');
  //   sgMail.setApiKey(ENV.sendgridApiKey);
  //   await sgMail.send({
  //     to: userEmail,
  //     from: 'noreply@example.com',
  //     subject: payload.title,
  //     html: payload.content,
  //   });
  // }
}

/**
 * Send a notification to the project owner
 * This is a convenience wrapper for owner-specific notifications
 *
 * @param message - Notification message
 */
export async function notifyOwner(message: string): Promise<void> {
  await sendNotification({
    title: "Project Notification",
    content: message,
    channel: "in-app",
    urgency: "normal",
  });
}
