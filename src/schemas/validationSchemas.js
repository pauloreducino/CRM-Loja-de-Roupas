import { z } from "zod";

export const clienteSchema = z.object({
  nome: z.string().min(3, "O nome é obrigatório (mínimo 3 caracteres)."),
  telefone: z
    .string()
    .min(10, "O telefone é obrigatório (mínimo 10 dígitos).")
    .regex(
      /^[0-9()-\s]+$/,
      "O telefone deve conter apenas números e os caracteres: ( ) -"
    ),
  email: z
    .string()
    .email("Formato de email inválido.")
    .optional()
    .or(z.literal("")),
  dataNascimento: z.string().optional(),
  endereco: z.string().optional(),
  observacoes: z.string().optional(),
});

export const vendaSchema = z.object({
  clienteId: z.string().min(1, "É obrigatório selecionar um cliente."),
  valor: z.coerce
    .number()
    .positive("O valor da venda deve ser maior que zero."),
  descricao: z.string().optional(),
  dataVenda: z.string().min(1, "A data da venda é obrigatória."),
  formaPagamento: z.string(),
  credito: z.coerce
    .number()
    .min(0, "O valor do crédito não pode ser negativo.")
    .optional(),
  validadeCredito: z.string().optional(),
});

export const regraSchema = z.object({
  nome: z.string().min(3, "O nome da regra é obrigatório."),
  tipo: z.enum(["aniversario", "credito", "inatividade"]),
  diasAntes: z.coerce
    .number()
    .int("O valor deve ser um número inteiro.")
    .min(0, "O número de dias não pode ser negativo."),
  mensagem: z
    .string()
    .min(10, "A mensagem é obrigatória (mínimo 10 caracteres)."),
  ativo: z.boolean(),
});
