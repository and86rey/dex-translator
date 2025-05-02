function translateDex() {
  const input = document.getElementById("dexInput").value;
  const result = document.getElementById("result");
  result.innerHTML = "";

  const lines = input.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
  const typeLine = lines.find(l => l.includes(":79:/HSMT/"));
  if (!typeLine) {
    return showError("Missing DEX message type (:79:/HSMT/)");
  }

  const dexType = typeLine.match(/:79:\/HSMT\/(\w+)/)?.[1];
  const schema = DEX_SCHEMAS[dexType];

  if (!schema) return showError(`Unsupported DEX type: ${dexType}`);

  const missingTags = schema.requiredTags.filter(tag => !lines.some(l => l.startsWith(tag)));
  if (missingTags.length) {
    return showError(`Invalid DEX message. Missing tags: ${missingTags.join(", ")}`);
  }

  // Begin building SWIFT message
  const swiftLines = [`{1:F01BANKBEBBAXXX0000000000}`, `{2:I${schema.swiftType}BANKDEFFXXXXN}`, `{4:`];

  for (const tag in schema.fieldMap) {
    const line = lines.find(l => l.startsWith(tag));
    if (line) {
      const fieldValue = line.split(tag)[1] || "";
      swiftLines.push(`${schema.fieldMap[tag]}${fieldValue}`);
    }
  }

  swiftLines.push("-}");

  result.innerHTML = `<h3 class="valid">✔ Valid DEX message (inferred ${schema.swiftType})</h3><pre>${swiftLines.join("\n")}</pre>`;
}

function showError(msg) {
  const result = document.getElementById("result");
  result.innerHTML = `<h3 class="invalid">✖ ${msg}</h3>`;
}
