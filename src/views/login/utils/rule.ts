import { reactive } from "vue";
import type { FormRules } from "element-plus";
import { useUserStoreHook } from "@/store/modules/user";

export const REGEXP_PWD =
  /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)(?!^.*[\u4E00-\u9FA5].*$)([^(0-9a-zA-Z)]|[()]|[a-z]|[A-Z]|[0-9]){8,18}$/;

const loginRules = reactive(<FormRules>{
  password: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("Senha inválida"));
        } else if (!REGEXP_PWD.test(value)) {
          callback(
            new Error("Sua senha não atende aos requisitos de segurança")
          );
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ],
  verifyCode: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error('Código de verificação inválido'));
        } else if (useUserStoreHook().verifyCode !== value) {
          callback(
            new Error('Código de verificação inválido')
          );
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ]
});

export { loginRules };
