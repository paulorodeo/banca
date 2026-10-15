import { delegacias } from "../src/content/local/delegacias";
import evidence from "../docs/auditoria-delegacias-2026-10-15.json";

const local = new Set(delegacias.map((dp) => Number(dp.unidade.numero)));
const reference = new Set(evidence.referenceNumbers);
console.log(
  JSON.stringify(
    {
      localPages: delegacias.length,
      localUniqueNumbers: local.size,
      officialReferenceCount: reference.size,
      missingFromLocal: [...reference].filter((number) => !local.has(number)),
      localOutsideReference: [...local].filter((number) => !reference.has(number)),
      sequenceGapsWithoutReferenceConfirmation: Array.from(
        { length: 103 },
        (_, index) => index + 1,
      ).filter((number) => !local.has(number) && !reference.has(number)),
      referenceUrl: evidence.sourceUrl,
      sourcePublicationDate: evidence.sourcePublicationDate,
      checkedAt: evidence.checkedAt,
    },
    null,
    2,
  ),
);
