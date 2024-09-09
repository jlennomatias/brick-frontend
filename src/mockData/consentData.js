export const consentData =
  {
    consentData: {
      interactionId: "rQOj9LwWKVi6tTkptjFr2",
      consent: {
        kind: "payment",
        creditor: {
          personType: "PESSOA_NATURAL",
          cpfCnpj: "12345678909",
          name: "Joao Silva",
        },
        payment: {
          amount: "200.00",
          details: {
            proxy: "apix@finansystech.com",
          },
          schedule: {
            custom: {
              dates: ["2023-08-23", "2023-09-26"],
              additionalInformation: "Todas quintas e domingos por 6 meses",
            },
          },
          type: "PIX",
        },
        idempotencyKey: "fd9cf245-cabf-4c69-9aae-527f96b10d11",
        creationDateTime: "2024-04-15T18:38:44.756Z",
        status: "AUTHORISED",
        statusUpdateDateTime: "2024-04-15T18:39:04.411Z",
        expirationDateTime: "2024-10-05T11:38:44.000Z",
        organizationName: "Finansystech",
        organizationLogo: "src/assets/img/f-icon.png",
      },
    },
    accountData: [
      {
        issuer: "1234",
        accountType: "CACC",
        number: "56789",
        ispb: "60779196",
        balance: 1200.5,
      },
      {
        issuer: "9876",
        accountType: "TRAN",
        number: "5432",
        ispb: "60779196",
        balance: 2500.75,
      },
    ],
  };

  // {
  //   consentData: {
  //     interactionId: "rQOj9LwWKVi6tTkptjFr2",
  //     consent: {
  //       journey: [],
  //       creditors: [
  //         {
  //           personType: "PESSOA_NATURAL",
  //           cpfCnpj: "99991111140",
  //           name: "Joao Silva",
  //         },
  //         {
  //           personType: "PESSOA_NATURAL",
  //           cpfCnpj: "99991111140",
  //           name: "Pedro dos Santos",
  //         },
  //       ],
  //       startDateTime: "2024-04-15T18:38:44Z",
  //       debtorAccount: {
  //         ispb: "99999994",
  //         issuer: "0001",
  //         number: "12346578",
  //         accountType: "TRAN",
  //         ibgeTownCode: "3550308",
  //       },
  //       recurringConfiguration: {
  //         sweeping: {
  //           totalAllowedAmount: "600.00",
  //         },
  //       },
  //       idempotencyKey: "fd9cf245-cabf-4c69-9aae-527f96b10d11",
  //       creationDateTime: "2024-04-15T18:38:44.756Z",
  //       status: "AUTHORISED",
  //       statusUpdateDateTime: "2024-04-15T18:39:04.411Z",
  //       expirationDateTime: "2024-10-12T18:38:44.000Z",
  //       loggedUser: {
  //         document: {
  //           identification: "12345678909",
  //           rel: "CPF",
  //         },
  //       },
  //       kind: "AUTOMATIC_PAYMENT",
  //       fapiInteractionId: "68e13d2a-f0d3-4027-83a0-3d4b48701b76",
  //       applicantId: "50b67cd8-5f86-5f81-99b5-af83dae25c74",
  //       applicantSoftwareId: "4be194d5-137c-45f3-bfc2-664edf9482b4",
  //       transactions: [],
  //       events: [
  //         {
  //           date: "2024-04-15T18:38:44.756Z",
  //           event: "AWAITING_AUTHORISATION",
  //         },
  //         {
  //           date: "2024-04-15T18:38:48.951Z",
  //           event: "REDIRECTED",
  //         },
  //         {
  //           date: "2024-04-15T18:39:04.411Z",
  //           event: "AUTHORISED",
  //         },
  //         {
  //           date: "2024-04-15T18:39:04.469Z",
  //           event: "CODE_GENERATED",
  //         },
  //         {
  //           date: "2024-04-15T18:39:07.842Z",
  //           event: "TOKEN_GENERATED",
  //         },
  //       ],
  //       recurringConsentId:
  //         "urn:iniciador:4b6fd7bd-8dd7-4793-bd92-1fe0ab720055",
  //       consentTerm: 5,
  //       consentTermUnit: "M",
  //       organizationName: "Iniciador Certificação FAPI 1",
  //       organizationLogo: "src/assets/img/f-icon.png",
  //     },
  //   },
  //   accountData: [
  //     {
  //       issuer: "1234",
  //       accountType: "CACC",
  //       number: "56789",
  //       ispb: "60779196",
  //       balance: 1200.5,
  //     },
  //     {
  //       issuer: "9876",
  //       accountType: "TRAN",
  //       number: "5432",
  //       ispb: "60779196",
  //       balance: 2500.75,
  //     },
  //   ],
  // };
