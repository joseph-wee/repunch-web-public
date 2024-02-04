import React from "react";
import {
  btn_to_facebook_wht_test,
  btn_to_instagram_wht_test,
  btn_to_mail_wht_test,
  img_repunch_logo_test,
} from "../assets";
import Image from "next/image";

const test930 = () => {
  return (
    <div>
      <Image src={btn_to_facebook_wht_test} alt="facebook_test" />
      <Image src={btn_to_instagram_wht_test} alt="instagram_test" />
      <Image src={btn_to_mail_wht_test} alt="mail_test" />
      <Image src={img_repunch_logo_test} alt="logo_test" />
    </div>
  );
};

export default test930;
