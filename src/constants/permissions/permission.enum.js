const PermissionEnum = Object.freeze({
  USER: {
    CREATE: "USER_CREATE",
    UPDATE: "USER_UPDATE",
    DELETE: "USER_DELETE",
    MANAGE: "MANAGE_USER",
  },
  PORTFOLIO: {
    CREATE: "PORTFOLIO_CREATE",
    UPDATE: "PORTFOLIO_UPDATE",
    DELETE: "PORTFOLIO_DELETE",
    VIEW: "PORTFOLIO_VIEW",
  },
  TRADE: {
    BUY: "TRADE_BUY",
    SELL: "TRADE_SELL",
  },
  SHARE: {
    CREATE: "SHARE_CREATE",
    UPDATE: "SHARE_UPDATE",
    DELETE: "SHARE_DELETE",
    VIEW: "SHARE_VIEW",
  },
});

module.exports = PermissionEnum;
