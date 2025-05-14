/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    visitInfo?: {
      timestamp: string;
      path: string;
    };
  }
}