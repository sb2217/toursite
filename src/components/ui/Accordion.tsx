"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ items, className = "" }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="border border-neutral/10 rounded-2xl bg-white overflow-hidden transition-smooth"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-neutral/5 transition-smooth"
              aria-expanded={isOpen}
            >
              <span className="font-display font-medium text-foreground text-base md:text-lg">
                {item.title}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-neutral transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-primary" : ""
                }`}
              />
            </button>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen ? "max-h-[500px] border-t border-neutral/5" : "max-h-0"
              }`}
            >
              <div className="px-6 py-5 text-neutral text-sm md:text-base leading-relaxed">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
