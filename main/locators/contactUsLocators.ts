export const contactUsPageLocators = {
  contactUsHeader: {
    role: "heading" as const,
    text: { name: "CONTACT US" },
  },
  formLabelName: {
    text: "Name" as const,
    option: { exact: true },
  },
  textFieldName: {
    role: "textbox" as const,
    text: { name: "Name", exact: true },
  },
  formLabelEmailAddress: {
    text: "Email Address",
  },
  textFieldEmailAddress: {
    role: "textbox" as const,
    text: { name: "Email Address" },
  },
  formLabelContactNumber: {
    text: "Contact Number",
  },
  textFieldContactNumber: {
    role: "textbox" as const,
    text: { name: "Contact Number" },
  },
  formLabelCompanyName: {
    text: "Company",
  },
  textFieldCompanyName: {
    role: "textbox" as const,
    text: { name: "Company" },
  },
  formLabelJobTitle: {
    text: "Job Title",
  },
  textFieldJobTitle: {
    role: "textbox" as const,
    text: { name: "Job Title" },
  },
  formLabelTypeOfInquiry: {
    text: "Job Title",
  },
  selectTypeOfInquiry: {
    role: "combobox" as const,
    text: { name: "recipient" },
  },
  formLabelSubject: {
    text: "Subject",
  },
  textFieldSubject: {
    role: "textbox" as const,
    text: { name: "Subject" },
  },
  formLabelMessage: {
    xpath: "div[id='message-wrapper']",
    xpath2: "label",
  },
  textAreaMessage: {
    role: "textbox" as const,
    text: { name: "Message" },
    xpath: "div[id='message-wrapper']",
  },
  checkboxPrivacyPolicy: {
    role: "checkbox" as const,
    text: { name: "I have read and understood" },
  },
  linkPrivacyPolicy: {
    role: "link" as const,
    text: { name: "Privacy Notice" },
  },
  sendButton: {
    role: "button" as const,
    text: { name: "Send" },
  },
  messageAfterGetInTouch: {
    text: "Thank you for contacting us. We will get back to you soon.",
  },
  privacyPolicyLink: {
    role: "link" as const,
    text: { name: "Privacy Notice" },
    attribute: "href" as const,
    tagForChain: "span",
  },
};
