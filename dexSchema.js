// Minimal DEX field rules and tag descriptions for validation
const DEX_SCHEMAS = {
  ADVN: {
    requiredTags: [":20:", ":31P:", ":79:/EISD/", ":79:/CTSU/", ":35B:", ":32B:"],
    swiftType: "MT542",
    fieldMap: {
      ":20:": ":20:Transaction Reference Number",
      ":31P:": ":30:Trade Date",
      ":79:/EISD/": ":98A::SETT//",
      ":35B:": ":35B:",
      ":32B:": ":19A::SETT//"
    }
  }
};
