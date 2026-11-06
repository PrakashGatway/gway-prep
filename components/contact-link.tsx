import React from "react";

type ContactLinkProps = {
  value: string;
  className?: string;
};

export function ContactLink({ value, className = "" }: ContactLinkProps) {
  const contact = value.trim();
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
  const digits = contact.replace(/\D/g, "");
  const isPhone = digits.length >= 10 && /^[+\d\s().-]+$/.test(contact);

  if (!isEmail && !isPhone) return <>{value}</>;

  const href = isEmail ? "mailto:" + contact : "tel:+" + digits;
  return (
    <a href={href} className={("text-[#F36C45] hover:text-[#D9532F] hover:underline " + className).trim()}>
      {value}
    </a>
  );
}
