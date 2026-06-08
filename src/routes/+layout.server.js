// Pass the request-resolved locale (set in hooks.server.js) to the client.
export const load = ({ locals }) => ({ locale: locals.locale });
