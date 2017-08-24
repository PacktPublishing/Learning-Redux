import { Chapter44Page } from './app.po';

describe('chapter44 App', () => {
  let page: Chapter44Page;

  beforeEach(() => {
    page = new Chapter44Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
