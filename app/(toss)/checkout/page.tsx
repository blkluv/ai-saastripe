"use client";

import { useEffect, useRef, useState } from "react";
import {
  PaymentWidgetInstance,
  loadPaymentWidget,
  ANONYMOUS,
} from "@tosspayments/payment-widget-sdk";
import { useAsync } from "react-use";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";

const customerKey = "0Qo-nszIZFEaLcIyEdaqI";

export default function Home() {
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance["renderPaymentMethods"]
  > | null>(null);
  const [price, setPrice] = useState(100);

  useAsync(async () => {
    // ------  결제위젯 초기화 ------
    // 비회원 결제에는 customerKey 대신 ANONYMOUS를 사용하세요.
    const paymentWidget = await loadPaymentWidget(
      process.env.NEXT_PUBLIC_TOSS_TEST_CK!,
      customerKey
    ); // 회원 결제
    // const paymentWidget = await loadPaymentWidget(clientKey, ANONYMOUS)  // 비회원 결제

    // ------  결제위젯 렌더링 ------
    // 결제수단 UI를 렌더링할 위치를 지정합니다. `#payment-method`와 같은 CSS 선택자와 결제 금액 객체를 추가하세요.
    // DOM이 생성된 이후에 렌더링 메서드를 호출하세요.
    // https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      "#payment-widget",
      { value: price },
      { variantKey: "DEFAULT" } // 렌더링하고 싶은 결제 UI의 variantKey
    );

    // ------  이용약관 렌더링 ------
    // 이용약관 UI를 렌더링할 위치를 지정합니다. `#agreement`와 같은 CSS 선택자를 추가하세요.
    // https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자
    paymentWidget.renderAgreement("#agreement");

    paymentWidgetRef.current = paymentWidget;
    paymentMethodsWidgetRef.current = paymentMethodsWidget;
  }, []);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    // ------ 금액 업데이트 ------
    // 새로운 결제 금액을 넣어주세요.
    // https://docs.tosspayments.com/reference/widget-sdk#updateamount결제-금액
    paymentMethodsWidget.updateAmount(
      price,
      paymentMethodsWidget.UPDATE_REASON.COUPON
    );
  }, [price]);

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card className="w-full sm:w-[640px] flex flex-col items-center">
        <h1 className="mt-8 text-2xl font-semibold">주문서</h1>
        <span className="mt-2 text-lg font-semibold">
          💲결제 금액 {`${price.toLocaleString()}원`}
        </span>
        {/* <div>
          <label>
            <input
              type="checkbox"
              onChange={(event) => {
                setPrice(event.target.checked ? price - 5000 : price + 5000);
              }}
            />
            5,000원 할인 쿠폰 적용
          </label>
        </div> */}
        <div id="payment-widget" style={{ width: "100%" }} />
        <div id="agreement" style={{ width: "100%" }} />
        <Button
          className="mb-8"
          onClick={async () => {
            const paymentWidget = paymentWidgetRef.current;

            try {
              // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
              // 더 많은 결제 정보 파라미터는 결제위젯 SDK에서 확인하세요.
              // https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
              await paymentWidget?.requestPayment({
                orderId: "eg2YCbAncPnbxHKPfoarJ",
                orderName: "AI-SAAS",
                customerName: "CUSTOMER",
                customerEmail: "customer123@gmail.com",
                successUrl: `${window.location.origin}/success`,
                failUrl: `${window.location.origin}/fail`,
              });
            } catch (error) {
              // 에러 처리하기
              console.error(error);
            }
          }}
        >
          결제하기
        </Button>
      </Card>
    </main>
  );
}
