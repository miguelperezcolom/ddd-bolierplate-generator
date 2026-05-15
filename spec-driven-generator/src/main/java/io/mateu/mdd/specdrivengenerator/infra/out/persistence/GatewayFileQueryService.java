package io.mateu.mdd.specdrivengenerator.infra.out.persistence;

import io.mateu.mdd.specdrivengenerator.application.out.query.GatewayQueryService;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.GatewayDto;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.GatewayOperationDto;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.GatewayRow;

import java.util.List;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.GatewayEntity;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GatewayFileQueryService implements GatewayQueryService {

    final CommonFileRepository repository;

    @Override
    public ListingData<GatewayRow> findAll(String searchText, Object filters, Pageable pageable) {
        var data = repository.findAll(searchText, filters, pageable, GatewayEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(entity -> new GatewayRow(entity.id(), entity.name()))
                        .toList()));
    }

    @Override
    public String getLabel(String id) {
        return repository.findById(id, GatewayEntity.class).map(GatewayEntity::name).orElseThrow();
    }

    @Override
    public Optional<GatewayDto> getById(String id) {
        return repository.findById(id, GatewayEntity.class)
                .map(entity -> new GatewayDto(entity.id(), entity.name(),
                        entity.authType(), entity.authUsername(), entity.authPassword(),
                        entity.authApiKeyHeaderName(), entity.authBearerToken(),
                        entity.authOAuth2ClientId(), entity.authOAuth2ClientSecret(),
                        entity.authOAuth2TokenUrl(), entity.authOAuth2Scopes(),
                        entity.operations() == null ? List.of() :
                                entity.operations().stream()
                                        .map(o -> new GatewayOperationDto(o.id(), o.name(), o.inputModelId(), o.outputModelId(),
                                                o.timeoutMs(), o.retryMaxAttempts(), o.retryWaitDurationMs(),
                                                o.circuitBreakerEnabled(), o.circuitBreakerFailureRateThreshold(), o.circuitBreakerSlidingWindowSize()))
                                        .toList()));
    }
}
