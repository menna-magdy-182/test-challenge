import type {
  TestListItem,
  TestSection,
} from '@/features/tests/utils/normalizeTests';

const matchesSearchQuery = (item: TestListItem, query: string) => {
  const searchableText = [
    item.title,
    item.subtitle,
    item.rawType,
    item.deviceName,
  ]
    .join(' ')
    .toLowerCase();

  return searchableText.includes(query);
};

export const filterTestSections = (
  sections: TestSection[],
  query: string,
): TestSection[] => {
  const normalizedQuery = query.trim().toLowerCase();

  const filteredSections = normalizedQuery
    ? sections.map(section => ({
        ...section,
        data: section.data.filter(item =>
          matchesSearchQuery(item, normalizedQuery),
        ),
      }))
    : sections;

  return filteredSections.filter(section => section.data.length > 0);
};
