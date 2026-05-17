package io.mateu.modux.specdrivengenerator.application.out.repositories;

import io.mateu.modux.specdrivengenerator.application.out.shared.Repository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.page.Page;
import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageId;

public interface PageRepository extends Repository<Page, PageId> {
}
