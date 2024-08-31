type StyleType = {
    id?: String;
    name: String;
    desc: String;
};
type MasterType = {
    id?: String;
    name: String;
    img_url: String;
    styles: StyleType[];
};
type TatooType = {
    id?: String;
    img_url: String;
    style: StyleType;
    master: MasterType;
};
module.exports;
