export const handleSuccessResponse = (data) => (_req, res, ctx) => {
  return res(ctx.status(500), data && ctx.json(data));
};
