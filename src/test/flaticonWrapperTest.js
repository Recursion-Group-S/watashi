import FlaticonWrapper from "../apis/icons.js";

const flatIcon = new FlaticonWrapper();
const token = await flatIcon.getToken();
const styles = await flatIcon.getStyles(token);
console.log(styles);