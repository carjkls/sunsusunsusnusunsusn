import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function currency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0
  });
}

export function marginValue(totalValue: number, totalCosts: number) {
  return totalValue - totalCosts;
}

export function marginPercent(totalValue: number, totalCosts: number) {
  if (!totalValue) return 0;
  return Math.round((marginValue(totalValue, totalCosts) / totalValue) * 100);
}

export function overdueInstallment(dueDate: string, status: string) {
  return status === "Pendente" && new Date(`${dueDate}T12:00:00`) < new Date();
}
