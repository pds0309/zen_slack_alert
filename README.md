# zen_slack_alert

젠허브 프로젝트 이슈 파이프라인 이동 Slack 알림 서비스

> Aws Lambda + Zenhub + Slack Webhook + Github Actions 를 연동한 젠허브 프로젝트 이슈 파이프라인 이동 Slack 알림 서비스

<br>

## Why?

🔗 팀으로 프로젝트를 하며 프론트/백엔드 저장소를 나누면서도 한번에 효과적으로 이슈 트래킹을 하기 위해 `Zenhub` 라는 툴을 사용하게 되었습니다.

🔗 자체적으로 젠허브 칸반보드 활용에 대해 `Slack` 알림 서비스를 제공해주지만 불필요한 알림이 너무 많았고 커스터마이징도 불가능했습니다.

🔗 따라서 **Slack WebHooks** + **Aws Lambda** + **Api Gateway** 를 활용하여 **필요한 이슈 파이프라인의 이동에 대해서만 알림을 주는** 기능을 만들어보았습니다.

<br>

## Effect

🔗 필요한 이슈의 파이프라인 이동에 대해서 Slack 에 알림 메시지를 전송해줄 수 있다.

- 예: 리뷰요청/리뷰완료 파이프라인에만 알림을 주어 이슈에 대한 리뷰 관련 상태를 팀원들이 빠르게 캐치할 수 있다.

- **Slack Github** 앱에도 없는 리뷰 요청 관련 알림을 줄 수 있다는 점이 큰 장점 같음

🔗 코드 변경없이 알림 메시지를 줄 이슈 파이프라인을 추가/수정 할 수 있다.

- **Lambda** 의 환경변수를 적극적으로 사용함.

🔗 **Github Actions** 로 CI/CD 를 구현해두어 코드의 변경을 즉시 알림 기능에 반영할 수 있다.

- 팀원들의 가벼운 변경, 요청 사항에도 빠르고 쉽게 대처 가능

<br>

## Etc

**언어**

- NodeJs 16

**기술**

- Aws Lambda

- Aws Api Gateway

- Github Actions

<br>

## 어떻게 사용하나요?

- [위키참조](https://github.com/pds0309/zen_slack_alert/wiki/How_To_Use)

<br>

## References

- [zenhub](https://www.zenhub.com/)

- [zenhub-slack](https://blog.zenhub.com/zenhub-slack/)

- [zenhub-api](https://github.com/ZenHubIO/API)
