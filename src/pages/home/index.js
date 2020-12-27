import template from "./template.marko";

export default (req, res) => {
  template.stream({}).pipe(res);
};
