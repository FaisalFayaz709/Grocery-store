/**
 * @typedef {Object} OrderItem
 * @property {string} productId
 * @property {string} name
 * @property {number} price
 * @property {number} quantity
 */

/**
 * @typedef {Object} Order
 * @property {string} id
 * @property {string} userId
 * @property {OrderItem[]} items
 * @property {number} total
 * @property {string} status - "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {string=} trackingId
 */

export {};
