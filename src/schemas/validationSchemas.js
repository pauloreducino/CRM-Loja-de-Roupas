import { z } from "zod";

export const clienteSchema = z.object({
  nome: z
    .string()
    .min(3, "O nome deve ter no mínimo 3 caracteres")
    .max(100, "O nome deve ter no máximo 100 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "O nome deve conter apenas letras"),

  telefone: z
    .string()
    .min(1, "O telefone é obrigatório")
    .refine(
      (val) => {
        const apenasNumeros = val.replace(/\D/g, "");
        return apenasNumeros.length === 11;
      },
      { message: "O telefone deve ter 11 dígitos (DDD + número)" }
    )
    .refine(
      (val) => {
        const apenasNumeros = val.replace(/\D/g, "");
        const ddd = parseInt(apenasNumeros.substring(0, 2));
        return ddd >= 11 && ddd <= 99;
      },
      { message: "DDD inválido" }
    ),

  email: z
    .string()
    .email("Formato de e-mail inválido")
    .max(100, "O e-mail deve ter no máximo 100 caracteres")
    .optional()
    .or(z.literal("")),

  dataNascimento: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const hoje = new Date();
        const nascimento = new Date(val);
        return nascimento < hoje;
      },
      { message: "A data de nascimento não pode ser futura" }
    ),

  endereco: z
    .string()
    .max(200, "O endereço deve ter no máximo 200 caracteres")
    .optional(),

  observacoes: z
    .string()
    .max(500, "As observações devem ter no máximo 500 caracteres")
    .optional(),
});

export const vendaSchema = z.object({
  clienteId: z.string().min(1, "É obrigatório selecionar um cliente"),

  valor: z.coerce
    .number({ invalid_type_error: "O valor deve ser um número" })
    .positive("O valor da venda deve ser maior que zero")
    .max(999999.99, "O valor máximo é R$ 999.999,99"),

  descricao: z
    .string()
    .max(200, "A descrição deve ter no máximo 200 caracteres")
    .optional(),

  dataVenda: z
    .string()
    .min(1, "A data da venda é obrigatória")
    .refine(
      (val) => {
        const dataVenda = new Date(val);
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        return dataVenda <= hoje;
      },
      { message: "A data da venda não pode ser futura" }
    ),

  formaPagamento: z.enum(["dinheiro", "cartao", "pix", "boleto"], {
    errorMap: () => ({ message: "Selecione uma forma de pagamento válida" }),
  }),

  credito: z.coerce
    .number({ invalid_type_error: "O crédito deve ser um número" })
    .min(0, "O valor do crédito não pode ser negativo")
    .max(999999.99, "O valor máximo do crédito é R$ 999.999,99")
    .optional()
    .default(0),

  validadeCredito: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const validade = new Date(val);
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        return validade >= hoje;
      },
      { message: "A validade do crédito não pode ser no passado" }
    ),
});

export const regraSchema = z.object({
  nome: z
    .string()
    .min(3, "O nome da regra deve ter no mínimo 3 caracteres")
    .max(100, "O nome da regra deve ter no máximo 100 caracteres"),

  tipo: z.enum(["aniversario", "credito", "inatividade"], {
    errorMap: () => ({ message: "Selecione um tipo de regra válido" }),
  }),

  diasAntes: z.coerce
    .number({ invalid_type_error: "Deve ser um número" })
    .int("O valor deve ser um número inteiro")
    .min(0, "O número de dias não pode ser negativo")
    .max(365, "O número máximo de dias é 365"),

  mensagem: z
    .string()
    .min(10, "A mensagem deve ter no mínimo 10 caracteres")
    .max(500, "A mensagem deve ter no máximo 500 caracteres"),

  ativo: z.boolean().default(true),
});
