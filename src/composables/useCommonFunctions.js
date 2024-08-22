import { useQuasar } from "quasar";

export function useCommonFunctions() {
  const { notify } = useQuasar();

  const showError = (message) => {
    notify({
      message: `${message}`,
      type: "negative",
    });
  };

  const handleRequestError = (error) => {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        showError("Credenciais inválidas.");
      } else if (status === 429) {
        showError(
          "Você excedeu o número máximo de tentativas. Por favor, tente novamente mais tarde.",
        );
      } else if (status >= 500) {
        showError("Erro no servidor. Tente novamente mais tarde.");
      } else {
        showError("Erro na requisição. Tente novamente mais tarde.");
      }
    } else {
      showError("Erro na requisição. Tente novamente mais tarde.");
    }
  };

  const cancel = () => {
    setTimeout(() => {
      window.location.href = "https://www.finansystech.com.br/";
    }, 2500);
  };

  const getDeviceInfo = () => {
    const platform = /Mobi|Android/i.test(navigator.userAgent)
      ? "APP"
      : "BROWSER";
    let os = "OTHER";
    let osVersion = "Unknown Version";

    const userAgent = navigator.userAgent;
    let match;

    if (userAgent.indexOf("Win") !== -1) {
      os = "WINDOWS";
      match = userAgent.match(/Windows NT (\d+\.\d+)/);
      if (match) osVersion = match[1];
    } else if (userAgent.indexOf("Mac") !== -1) {
      os = "MACOS";
      match = userAgent.match(/Mac OS X (\d+[_\.]\d+)/);
      if (match) osVersion = match[1].replace("_", ".");
    } else if (userAgent.indexOf("Linux") !== -1) {
      os = "LINUX";
      match = userAgent.match(/Linux (\d+\.\d+)/);
      if (match) osVersion = match[1];
    } else if (userAgent.indexOf("Android") !== -1) {
      os = "ANDROID";
      match = userAgent.match(/Android (\d+\.\d+)/);
      if (match) osVersion = match[1];
    } else if (userAgent.indexOf("like Mac") !== -1) {
      os = "IOS";
      match = userAgent.match(/CPU OS (\d+[_\.]\d+)/);
      if (match) osVersion = match[1].replace("_", ".");
    } else if (userAgent.indexOf("X11") !== -1) {
      os = "UNIX";
      osVersion = "Unknown Version";
    }

    return {
      platform,
      os,
      osVersion,
    };
  };

  const applyCPFMask = (cpfCnpj) => {
    if (cpfCnpj.length === 11) {
      return cpfCnpj.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    } else if (cpfCnpj.length === 14) {
      return cpfCnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    }
    return cpfCnpj;
  };

  const getAccountTypeLabel = (accountType) => {
    const accountTypes = {
      CONTA_CORRENTE: { label: "Conta Corrente", sigla: "CC" },
      CONTA_POUPANCA: { label: "Conta Poupança", sigla: "CP" },
      // Outros tipos de conta...
    };
    return accountTypes[accountType] || { label: "Tipo desconhecido", sigla: "" };
  };

  return {
    showError,
    handleRequestError,
    cancel,
    getDeviceInfo,
    applyCPFMask,
    getAccountTypeLabel,
  };
}
