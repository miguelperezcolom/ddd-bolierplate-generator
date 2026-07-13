{{- define "modux.fullname" -}}
{{- printf "%s" .Release.Name | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "modux.jdbcUrl" -}}
{{- if .Values.postgresql.enabled -}}
jdbc:postgresql://{{ .Release.Name }}-postgresql:5432/{{ .Values.postgresql.auth.database }}
{{- else -}}
{{ required "postgresql.enabled=false exige externalDatabase.jdbcUrl" .Values.externalDatabase.jdbcUrl }}
{{- end -}}
{{- end -}}

{{- define "modux.dbUser" -}}
{{- if .Values.postgresql.enabled }}{{ .Values.postgresql.auth.username }}{{ else }}{{ .Values.externalDatabase.username }}{{ end -}}
{{- end -}}

{{- define "modux.dbPassword" -}}
{{- if .Values.postgresql.enabled }}{{ .Values.postgresql.auth.password }}{{ else }}{{ .Values.externalDatabase.password }}{{ end -}}
{{- end -}}
