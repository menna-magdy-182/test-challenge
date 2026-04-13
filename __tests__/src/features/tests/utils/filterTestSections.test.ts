import { filterTestSections } from '@/features/tests/utils/filterTestSections';
import type { TestSection } from '@/features/tests/utils/normalizeTests';

const makeSection = (
  category: 'moderated' | 'unmoderated',
  items: {
    title: string;
    subtitle: string;
    rawType?: string;
    deviceName?: string;
  }[],
): TestSection => ({
  title: category === 'moderated' ? 'Moderated tests' : 'Unmoderated tests',
  category,
  data: items.map((item, i) => ({
    id: `${category}-${i}`,
    category,
    title: item.title,
    subtitle: item.subtitle,
    rawType: item.rawType ?? '',
    deviceName: item.deviceName ?? '',
    feeLabel: '$10',
    durationLabel: '20 min',
  })),
});

const sections: TestSection[] = [
  makeSection('moderated', [
    {
      title: 'Moderated session',
      subtitle: 'iPhone 14',
      deviceName: 'iPhone 14',
    },
  ]),
  makeSection('unmoderated', [
    {
      title: 'Standard test',
      subtitle: 'Pixel 7 • Android 13',
      deviceName: 'Pixel 7',
    },
    {
      title: 'Ad hoc test',
      subtitle: 'MacBook Pro',
      deviceName: 'MacBook Pro',
    },
  ]),
];

describe('filterTestSections', () => {
  it('returns all sections unchanged when query is empty', () => {
    expect(filterTestSections(sections, '')).toEqual(sections);
  });

  it('returns all sections unchanged when query is only whitespace', () => {
    expect(filterTestSections(sections, '   ')).toEqual(sections);
  });

  it('filters items by title (case-insensitive)', () => {
    const result = filterTestSections(sections, 'standard');
    expect(result).toHaveLength(1);
    expect(result[0].category).toBe('unmoderated');
    expect(result[0].data).toHaveLength(1);
    expect(result[0].data[0].title).toBe('Standard test');
  });

  it('filters items by subtitle', () => {
    const result = filterTestSections(sections, 'pixel');
    expect(result).toHaveLength(1);
    expect(result[0].data[0].subtitle).toContain('Pixel');
  });

  it('filters items by deviceName', () => {
    const result = filterTestSections(sections, 'macbook');
    expect(result).toHaveLength(1);
    expect(result[0].data[0].deviceName).toBe('MacBook Pro');
  });

  it('removes sections with no matching items', () => {
    const result = filterTestSections(sections, 'iphone');
    expect(result).toHaveLength(1);
    expect(result[0].category).toBe('moderated');
  });

  it('returns empty array when no items match', () => {
    const result = filterTestSections(sections, 'zzznomatch');
    expect(result).toHaveLength(0);
  });

  it('trims whitespace from query before matching', () => {
    const result = filterTestSections(sections, '  iphone  ');
    expect(result).toHaveLength(1);
    expect(result[0].category).toBe('moderated');
  });

  it('matches across multiple sections', () => {
    const result = filterTestSections(sections, 'test');
    // "Moderated session" doesn't contain "test", but "Standard test" and "Ad hoc test" do
    expect(result).toHaveLength(1);
    expect(result[0].category).toBe('unmoderated');
    expect(result[0].data).toHaveLength(2);
  });
});
