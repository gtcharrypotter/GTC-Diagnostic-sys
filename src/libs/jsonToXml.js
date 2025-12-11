export const jsonToXml = (data) => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<PhilHealthClaim>';
  Object.keys(data).forEach((key) => {
    xml += `<${key}>`;
    const value = data[key];
    if (typeof value === 'object') {
      Object.keys(value).forEach((subKey) => {
        xml += `<${subKey}>${value[subKey]}</${subKey}>`;
      });
    } else {
      xml += value;
    }
    xml += `</${key}>`;
  });
  xml += '</PhilHealthClaim>';
  return xml;
};