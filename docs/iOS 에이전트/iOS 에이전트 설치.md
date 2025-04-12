import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 1. 최소 요구 사항

:::warning
아래의 요구 사항은 변동이 어렵습니다.
:::

- iOS 12.0 이상
- Storyboard(Objective-C 및 Swift), SwiftUI

---

## 2. 에이전트 설치

NetFUNNEL iOS 에이전트는 .framework형식으로 제공됩니다. iOS 프로젝트에 .framework파일을 추가하고, Xcode에 등록합니다.

### 2.1 Framework 다운로드

NetFUNNEL 콘솔의 에이전트 탭에서 NetFUNNEL iOS 에이전트를 다운로드합니다.

![설명](/img/ios-agent/install/ios_install_1.png)

프로젝트의 포맷에 맞는 에이전트를 설치하기 위한 과정으로 `.xcframework`를 사용하는 것을 권장합니다.

![설명](/img/ios-agent/install/ios_install_2.png)

### 2.2 Framework 적용

#### 2.2.1 Frameworks 폴더 생성

프로젝트의 루트 경로에 `Frameworks` 폴더를 생성합니다.

![설명](/img/ios-agent/install/ios_install_3.png)

#### 2.2.2 Framework 파일 이동

NetFUNNEL iOS 에이전트를 프로젝트 내 `Frameworks` 폴더에 추가합니다.

![설명](/img/ios-agent/install/ios_install_4.png)

#### 2.2.3 Framework 등록

NetFUNNEL iOS 에이전트를 프로젝트에 Framework로 포함시킵니다.

1. `[프로젝트 > General > Frameworks, Libraries, and Embedded Content >  + 버튼]`을 클릭하여 이전 과정에서 위치시킨 경로의 에이전트를 추가합니다.

![설명](/img/ios-agent/install/ios_install_5.png)


2. `Add Files…` 버튼을 클릭합니다.

![설명](/img/ios-agent/install/ios_install_6.png)

3. `Frameworks`에 위치시킨 에이전트를 클릭 후 Open버튼을 클릭합니다.

![설명](/img/ios-agent/install/ios_install_7.png)
![설명](/img/ios-agent/install/ios_install_8.png)

> 파일에 물음표('?')가 표시되는 경우 아래와 같은 순서로 프레임워크를 추가합니다.
>
> `[프레임워크 우클릭 > Source Control > Add netfunnel_ios.xcframework]`

---

## 3. 에이전트 초기화

NetFUNNEL iOS 에이전트는 앱 실행과 함께 초기화되어야 합니다. `AppDelegate`의 `application(_:didFinishLaunchingWithOptions:)`에서 초기화 작업을 수행합니다.

### 3.1 델리게이트 정의

NetFUNNEL iOS 에이전트 사용을 위해  델리게이트를 반드시 구현하고, 초기화 함수에 전달합니다.

| 델리게이트       | 호출 조건                      | 설명                                           | 필수 구현 여부                           |
|------------------|---------------------------|-----------------------------------------------|---------------------------------------|
| `nfSuccess`      | 진입 성공                    | 진입 성공 후 실행될 로직 구현 (대기실 닫힘)            | O                                     |
| `nfError`        | 넷퍼넬 서버 오류               | 넷퍼넬 서버 오류 발생 시 로직 (대기 중단 및 대기실 닫힘) | O                                      |
| `nfNetworkError` | 네트워크 오류                 | 네트워크 오류 발생 시 로직 (대기 중단 및 대기실 닫힘)    | O                                     |
| `nfBlock`        | 진입 차단                    | 차단실이 표시됐을 때 실행될 로직 구현                 | X                                     |
| `nfClose`        | 종료 함수 호출 후              | 대기실 종료 후 실행할 로직                         | X                                     |
| `nfComplete`     | 종료 함수 호출 후              | 종료 함수 호출 후 실행할 로직                       | X                                     |
| `nfContinue`     | 넷퍼넬 템플릿 미사용 및 대기 중   | 커스텀 대기실 UI에 상태 업데이트 로직 구현             | X                                     |

:::info
nfContinue는 커스텀 대기창 사용 시에만 호출합니다. 자세한 내용은 FAQ를 참고하세요.
:::

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
초기화 함수에 사용하는 `SERVER_URL`, `ERROR_URL은` **콘솔의 에이전트 탭**에서 확인합니다. 
:::