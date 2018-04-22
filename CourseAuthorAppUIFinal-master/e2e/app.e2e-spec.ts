import { CourseAuthorAppPage } from './app.po';

describe('course-author-app App', function() {
  let page: CourseAuthorAppPage;

  beforeEach(() => {
    page = new CourseAuthorAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
