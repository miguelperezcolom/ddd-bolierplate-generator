package io.mateu.modux.modeldrivengenerator.application.out.repositories;

import io.mateu.modux.modeldrivengenerator.application.out.shared.Repository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.page.Page;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.page.vo.PageId;

public interface PageRepository extends Repository<Page, PageId> {
}
