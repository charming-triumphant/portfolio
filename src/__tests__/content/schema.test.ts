import { describe, it, expect } from 'vitest';
import { z } from 'astro/zod';

const projectSchema = z.object({
  title: z.string(),
  summary: z.string(),
  date: z.date(),
  tags: z.array(z.string()),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  order: z.number(),
});

describe('Project content schema', () => {
  it('accepts valid frontmatter', () => {
    const valid = {
      title: 'Test Project',
      summary: 'A test project summary.',
      date: new Date('2026-01-15'),
      tags: ['Astro', 'React'],
      featured: true,
      draft: false,
      order: 1,
    };
    const result = projectSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it('defaults featured to false when missing', () => {
    const partial = {
      title: 'Test',
      summary: 'Summary',
      date: new Date('2026-01-01'),
      tags: ['Tag'],
      order: 1,
    };
    const result = projectSchema.safeParse(partial);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.featured).toBe(false);
      expect(result.data.draft).toBe(false);
    }
  });

  it('rejects missing title', () => {
    const invalid = {
      summary: 'Summary',
      date: new Date(),
      tags: [],
      order: 1,
    };
    const result = projectSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('rejects missing summary', () => {
    const invalid = {
      title: 'Title',
      date: new Date(),
      tags: [],
      order: 1,
    };
    const result = projectSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('rejects invalid date', () => {
    const invalid = {
      title: 'Title',
      summary: 'Summary',
      date: 'not-a-date',
      tags: [],
      order: 1,
    };
    const result = projectSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('rejects missing order', () => {
    const invalid = {
      title: 'Title',
      summary: 'Summary',
      date: new Date(),
      tags: [],
    };
    const result = projectSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('rejects non-array tags', () => {
    const invalid = {
      title: 'Title',
      summary: 'Summary',
      date: new Date(),
      tags: 'not-an-array',
      order: 1,
    };
    const result = projectSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });
});
