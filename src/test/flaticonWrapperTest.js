import FlaticonWrapper from "../apis/flaticon.js";

const flatIcon = new FlaticonWrapper();
const token = await flatIcon.getToken();

const styles = await flatIcon.getStyles(token);
const icons = await flatIcon.searchIcons(token);

console.log(styles);
console.log(icons);