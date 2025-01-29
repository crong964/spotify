import React from "react";

export interface iTab extends React.AllHTMLAttributes<HTMLDivElement> {
  nameTab: string;
  id: string;
}

export interface iTabs extends React.AllHTMLAttributes<HTMLDivElement> {
  value: string;
  onchange(p: string): void;
  
}
