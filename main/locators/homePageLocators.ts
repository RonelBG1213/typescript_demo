export const homePageLocators = {
    bannerHeader: {
        role: "heading" as const,
        text: {name: "Fast Forward"}
    },
    ourServicesHeader: {
        role: "heading" as const,
        text: {name:"OUR SERVICES"}
    },
    whyStratpointHeader: {
        role: "heading" as const,
        text: {name:"WHY STRATPOINT?"}
    },
    successStoriesHeader: {
        role: "heading"as const,
        text: {name:"SUCCESS STORIES"}
    },
    whatOurClientSayHeader: {
        role: "heading"as const,
        text: {name:"WHAT OUR CLIENTS SAY"}
    },
    whatsNewHeader: {
        role: "heading"as const,
        text: {name:"WHAT’S NEW"}
    },
    letsConnectHeader: {
        role: "heading"as const,
        text: {name:"Let's connect"}
    },
    formLabelName: {
        text: "Name"as const,
        option: { exact: true }
    },
    textFieldName: {
        role: "textbox"as const,
        text: { name: 'Name', exact: true }
    },
    formLabelEmailAddress: {
        text: "Email Address"
    },
    textFieldEmailAddress: {
        role: "textbox"as const,
        text: {name: 'Email Address'}
    },
    formLabelContactNumber: {
        text: "Contact Number"
    },
    textFieldContactNumber: {
        role: "textbox"as const,
        text: {name: 'Contact Number'}
    },
    formLabelCompanyName: {
        text: "Company Name"
    },
    textFieldCompanyName: {
        role: "textbox"as const,
        text: {name: 'Company name'}
    },
    formLabelJobTitle: {
        text: "Job Title"
    },
    textFieldJobTitle: {
        role: "textbox"as const,
        text: {name: 'Job Title'}
    },
    formLabelService: {
        text: "Job Title"
    },
    selectService: {
        role: "combobox"as const,
        text: {name: 'service'}
    },
    formLabelMessage: {
        xpath: "div[class*='hs_message']",
        xpath2: "//label[contains(@id, 'label-message')]"
    },
    textAreaMessage: {
        role: "textbox"as const,
        text: {name: 'Message'}
    },
    checkboxPrivacyPolicy: {
        role: "checkbox"as const,
        text: {name: 'We value your privacy and we\''}
    },
    linkPrivacyPolicy: {
        role: "link"as const,
        text: {name: 'Privacy Notice'}
    },
    getInTouchButton: {
        role: "button"as const,
        text: {name: 'GET IN TOUCH'}
    },
     messageAfterGetInTouch: {
        text: "Thank you for contacting us. We will get back to you soon."
    },
     privacyPolicyLink: {
         role: "link"as const,
        text: {name: 'Privacy Notice'},
        attribute: "href" as const,
        tagForChain: "span"
    },

}