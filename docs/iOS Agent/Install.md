## 목차

- [최소 요구 사항](#최소-요구-사항)
- [에이전트 설치](#에이전트-설치)
  - [1. Framework 다운로드](#1-framework-다운로드)
  - [2. Framework 적용](#2-framework-적용)
- [에이전트 초기화](#에이전트-초기화)
  - [1. 델리게이트 구현](#1-델리게이트-구현)
  - [2. 초기화 함수 호출 예시](#2-초기화-함수-호출-예시)
  - [3.2 초기화 함수 호출](#32-초기화-함수-호출)

## 최소 요구 사항

:::warning
아래의 요구 사항은 변동이 어렵습니다.
:::

- **iOS 버전**: iOS 12.0 이상
- **개발 환경**: Storyboard (Objective-C 및 Swift) 또는 SwiftUI

NetFUNNEL iOS 에이전트는 `.framework` 형식으로 제공되며, 최신 프로젝트에서는 `.xcframework` 사용을 권장합니다.

---

## 에이전트 설치

### 1. Framework 다운로드

1. NetFUNNEL 콘솔의 **에이전트 탭**에서 NetFUNNEL iOS 에이전트를 다운로드합니다.
2. 프로젝트 포맷에 맞는 에이전트를 선택 후 다운로드합니다.

### 2. Framework 적용

#### 2.1. Frameworks 폴더 생성

프로젝트의 루트 경로에 **Frameworks** 폴더를 생성합니다.

#### 2.2. Framework 파일 이동

다운로드한 NetFUNNEL iOS 에이전트 파일을 프로젝트 내 **Frameworks** 폴더로 이동합니다.

#### 2.3. Framework 등록

Xcode에서 다음 과정을 통해 에이전트를 프로젝트에 포함시킵니다:

1. **프로젝트 > General > Frameworks, Libraries, and Embedded Content** 영역의 **+ 버튼** 클릭
2. **Add Files…** 버튼을 통해 Frameworks 폴더에 위치한 에이전트를 선택 후 **Open** 버튼 클릭

> 만약 파일에 물음표(`?`)가 표시된다면, 아래 절차에 따라 프레임워크를 추가합니다.
>
> - **프레임워크 우클릭 > Source Control > Add netfunnel_ios.xcframework**

---

## 에이전트 초기화

앱 실행 시점에 `AppDelegate`의 `application(_:didFinishLaunchingWithOptions:)` 또는 해당하는 초기화 코드 내에서 NetFUNNEL iOS 에이전트를 초기화해야 합니다.

### 1. 델리게이트 구현

NetFUNNEL iOS 에이전트를 사용하려면 `NetfunnelDelegate`를 구현하여 아래와 같이 각 상태별 이벤트에 대한 로직을 정의합니다:

| 호출 조건        | 설명                           | 필수 구현 여부                     |
| ---------------- | ------------------------------ | ---------------------------------- |
| `nfSuccess`      | 진입 성공 후 실행할 로직       | O                                  |
| `nfError`        | 넷퍼넬 서버 오류 발생 시 로직  | O                                  |
| `nfNetworkError` | 네트워크 오류 발생 시 로직     | O                                  |
| `nfContinue`     | 커스텀 대기실 UI 상태 업데이트 | X (커스텀 대기창 사용 시에만 호출) |
| `nfBlock`        | 진입 차단 시 실행할 로직       | X                                  |
| `nfClose`        | 대기실 종료 후 실행할 로직     | X                                  |
| `nfComplete`     | 종료 함수 호출 후 실행할 로직  | X                                  |

아래는 Swift와 Objective-C에서 `NetfunnelDelegate`를 구현한 예시입니다.

### 2. 초기화 함수 호출 예시

아래 코드는 NetFUNNEL iOS 에이전트를 초기화하는 Swift와 Objective-C 코드 예시입니다. MDX 파일 내 탭 전환 기능을 사용하여 두 언어의 예제를 제공합니다.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="Swift" label="Swift">
    ```swift
    import Netfunnel_iOS
    import UIKit

    class NetfunnelViewController: UIViewController, NetfunnelDelegate {

        func nfSuccess(
            projectKey: String,
            segmentKey: String,
            statusCode: Int,
            message: String
        ) {
            print("nfSuccess \(statusCode) \(message)")
        }

        func nfContinue(
            projectKey: String,
            segmentKey: String,
            statusCode: Int,
            message: String,
            aheadWait: Int,
            behindWait: Int,
            waitTime: String,
            progressRate: Int
        ) {
            print("nfContinue \(statusCode) \(message)")
        }

        func nfClose(
            projectKey: String,
            segmentKey: String,
            statusCode: Int,
            message: String
        ) {
            print("nfClose \(statusCode) \(message)")
        }

        func nfBlock(
            projectKey: String,
            segmentKey: String,
            statusCode: Int,
            message: String
        ) {
            print("nfBlock \(statusCode) \(message)")
        }

        func nfError(
            projectKey: String,
            segmentKey: String,
            statusCode: Int,
            message: String
        ) {
            print("nfError \(statusCode) \(message)")
        }

        func nfNetworkError(
            projectKey: String,
            segmentKey: String,
            statusCode: Int,
            message: String
        ) {
            print("nfNetworkError \(statusCode) \(message)")
        }

        func nfComplete(
            projectKey: String,
            segmentKey: String,
            statusCode: Int,
            message: String
        ) {
            print("nfComplete \(statusCode) \(message)")
        }

    }
    ```
  </TabItem>
  <TabItem value="Objective-C" label="Objective-C">
    ```objectivec
        #import "NetfunnelViewController.h"

        @interface NetfunnelViewController ()

        @end

        @implementation NetfunnelViewController

        - (void)viewDidLoad {
            [super viewDidLoad];
        }

        #pragma mark - NetfunnelDelegate

        - (void)nfSuccessWithProjectKey:(NSString * _Nonnull)projectKey
                            segmentKey:(NSString * _Nonnull)segmentKey
                            statusCode:(NSInteger)statusCode
                            message:(NSString * _Nonnull)message {
            NSLog(@"nfSuccess %ld %@", (long)statusCode, message);
        }

        - (void)nfContinueWithProjectKey:(NSString * _Nonnull)projectKey
                            segmentKey:(NSString * _Nonnull)segmentKey
                            statusCode:(NSInteger)statusCode
                                message:(NSString * _Nonnull)message
                            aheadWait:(NSInteger)aheadWait
                            behindWait:(NSInteger)behindWait
                                waitTime:(NSString * _Nonnull)waitTime
                            progressRate:(NSInteger)progressRate {
            NSLog(@"nfContinue %ld %@", (long)statusCode, message);
        }

        - (void)nfCloseWithProjectKey:(NSString * _Nonnull)projectKey
                        segmentKey:(NSString * _Nonnull)segmentKey
                        statusCode:(NSInteger)statusCode
                            message:(NSString * _Nonnull)message {
            NSLog(@"nfClose %ld %@", (long)statusCode, message);
        }

        - (void)nfBlockWithProjectKey:(NSString * _Nonnull)projectKey
                        segmentKey:(NSString * _Nonnull)segmentKey
                        statusCode:(NSInteger)statusCode
                            message:(NSString * _Nonnull)message {
            NSLog(@"nfBlock %ld %@", (long)statusCode, message);
        }

        - (void)nfErrorWithProjectKey:(NSString * _Nonnull)projectKey
                        segmentKey:(NSString * _Nonnull)segmentKey
                        statusCode:(NSInteger)statusCode
                            message:(NSString * _Nonnull)message {
            NSLog(@"nfError %ld %@", (long)statusCode, message);
        }

        - (void)nfNetworkErrorWithProjectKey:(NSString * _Nonnull)projectKey
                                segmentKey:(NSString * _Nonnull)segmentKey
                                statusCode:(NSInteger)statusCode
                                    message:(NSString * _Nonnull)message {
            NSLog(@"nfNetworkError %ld %@", (long)statusCode, message);
        }

        - (void)nfCompleteWithProjectKey:(NSString * _Nonnull)projectKey
                            segmentKey:(NSString * _Nonnull)segmentKey
                            statusCode:(NSInteger)statusCode
                                message:(NSString * _Nonnull)message {
            NSLog(@"nfComplete %ld %@", (long)statusCode, message);
        }

        @end
    ```
  </TabItem>
</Tabs>


### 3.2 초기화 함수 호출

초기화 함수는 에이전트가 동작하는 데 필요한 설정 값을 받아 내부 구성 요소를 준비합니다.


<Tabs>
  <TabItem value="Swift" label="Swift">
    ```swift
import Netfunnel_iOS

Netfunnel.shared.initialize(
    serverUrl: "{{SERVER_URL}}",
    errorUrl: "{{ERROR_URL}}",
    delegate: self, // Set the delegate to a specified delegate object or 'self'.
    networkTimeout: 3000,
    retryCount: 0,
    printLog: true,
    errorBypass: false
    userId: "{{USER_ID}}"
) 
    ```
  </TabItem>
  <TabItem value="Objective-C" label="Objective-C">
    ```objectivec
#import "Netfunnel_iOS/Netfunnel_iOS.h" // @import Netfunnel_iOS;

Netfunnel *agent = [Netfunnel shared];
[agent initializeWithServerUrl:@"{{SERVER_URL}}"
                      errorUrl:@"{{ERROR_URL}}"
                    delegate:self      // Set the delegate to a specified delegate object or 'self'.
              networkTimeout:@3000
                  retryCount:@0
                    printLog:@false
        useNetfunnelTemplate:@true
                 errorBypass:@false
                      userId:@"{{USER_ID}}"
    ```
  </TabItem>
</Tabs>

:::info
초기화 함수에 사용하는 SERVER_URL, ERROR_URL은 콘솔의 에이전트 탭에서 확인합니다. 
:::