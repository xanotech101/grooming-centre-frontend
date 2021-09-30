export const handleSuccessResponse = (data) => (req, res, ctx) => {
  return res(ctx.status(200), data && ctx.json(data));
};
