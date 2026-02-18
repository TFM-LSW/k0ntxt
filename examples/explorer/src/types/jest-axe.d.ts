declare module 'jest-axe' {
  export function axe(container: HTMLElement): Promise<{ violations: any[] }>;
} 