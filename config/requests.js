const affiliateRequests = {
  getGeneralLinks: "user/affiliatelink/list",
  addGeneralLink: "user/affiliatelink",
  editGeneralLink: "user/affiliatelink",
  deleteGeneralLink: "user/affiliate/link",
  addProductLink: "product/affiliate/create",
  editProduct: "product/affiliate/list",
  deleteProductLink: "product/affiliate/list",
  getProductLinks: "product/affiliate/link",
};

const webinarRequest = {
  getWebinar: "/webinar/get-webinar-page-data/",
  getAll: "/webinar/get-all-webinars/",
  getAllLeads: "/webinar/get-all-leads/",
  getLeadsByUser: "/webinar/get-all-leads-by-user/",
  getFormData: "/webinar/get-registration-form-data/",
};

const productRequests = {
  getAll: "/product/list",
  getById: "/product/",
  create: "/product/create/",
  edit: "/product/",
  search: "/product/list/",
  delete: "/product/suspend/",
};

const courseRequests = {
  delete: "/course/",
  deleteModule: "/course/module/",
  deleteLesson: "/course/module/",
};

const emailRequests = {
  getAllTypes: "/user/email/emailtype/listall",
  getType: "/user/email/",
  save: "/user/email/",
};

const payoutRequests = {
  getAllPayouts: "/payout/",
  getPending: "/payout/admin/1/",
  getPaid: "/payout/admin/2/",
  getRefund: "/payout/admin/3/",
  getPaymentlog: "/payout/list/payments",
  updateStatus: "/payout/",
  updateMultiStatus: "/payout/multi-select-update",
};

const kycApprovalRequests = {
  getAll: "/user/kyc/",
  getPending: "/user/kyc/0/",
  getApproved: "/user/kyc/1/",
  getRejected: "/user/kyc/2/",
};

const adminRequests = {
  getAnalytics: "/user/analytics/admin/list/",
  getLinkLevels: "/link-level/get-all-link-levels/",
  searchLinkLevels: "/link-level/search/",
  createLinkLevel: "/link-level/create-link-level/",
  editLinkLevel: "/link-level/edit-link-level/",
  deleteApp: "/app-manager/delete-app/",
};

const userRequests = {
  resetPassword: "/resetpassword/",
  getAnalytics: "/user/analytics/list/",
  getLeaderboard: "/user/leaderboard/listall/",
  getTeam: "/user/team/listall/",
  getPayouts: "/payout/",
  getPending: "/payout/1/",
  getPaid: "/payout/2/",
  getRefund: "/payout/3/",
  getProduct: "/product/single/",
  getAffiliateLinks: "/user/affiliatelink/listall/",
  getLinkLevels: "/link-level/get-all-link-levels-by-user/",
};

const countryRequests = {
  COUNTRY: "https://api.countrystatecity.in/v1/countries",
};

const landingRequests = {
  PRODUCTS: "/user/landing/products/",
  CHECKOUT_REG: "/checkout/register/",
};

export {
  adminRequests,
  userRequests,
  affiliateRequests,
  webinarRequest,
  productRequests,
  courseRequests,
  emailRequests,
  countryRequests,
  landingRequests,
  payoutRequests,
  kycApprovalRequests,
};
