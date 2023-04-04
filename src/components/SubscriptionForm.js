import { useState, useRef } from "react";
import { toast } from "react-toastify";
import hitToast from "../helpers/hitToast";

export default function SubscriptionForm() {
  let [email, setEmail] = useState("");
  let [alertClass, setAlertClass] = useState("");
  const [loading, setLoading] = useState("");

  var parentComp = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    //Email Validated Here
    const validate = (email) => {
      if (
        email
          .trim()
          .match(
            /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
          ) == null
      ) {
        return false;
      } else if (email.trim() === "") {
        return false;
      }

      return true;
    };

    if (!validate(email)) {
      setAlertClass("alert-validate");
      toast.error("eroor");
      return;
    }
    //Data laoding ...
    setLoading("You have Subscribed Sucessfully..");
    //Data fetching here....
    fetch("http://localhost:5000/sendemail", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      // .then((data) => JSON.parse(`${data}`))
      .then((data) => {
        setLoading("");
        console.log(data);
        hitToast(data.acknowledged ? "sucess" : "erorr");
      })
      .catch(() => {
        setLoading("");
        hitToast("Something went wrong. Please try again.", "error");
      });

    // .then((data) => JSON.parse(`${data}`))
    // .then(
    //   (data) => {
    //     // console.log(data)
    //     if (data.acknowledged) {
    //       toast.success("sucess");
    //     } else {
    //       toast.error("erorr");
    //     }
    //   }

    // hitToast(data.message, data.success ? "success" : "error")
    // );
    // .catch((err) =>
    // toast.error('Email invalid')
    // hitToast("Something went wrong. Please try again.", "error")
    // );

    setAlertClass("");
  };

  return (
    <form
      className="w-full flex-w flex-c-m validate-form"
      onSubmit={handleSubmit}
    >
      <div
        ref={parentComp}
        className={"wrap-input100 validate-input where1 " + alertClass}
        data-validate="Valid email is required: user@email.domain"
      >
        <input
          className="input100 placeholder0 s2-txt2"
          type="text"
          name="email"
          placeholder="Enter Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <span className="focus-input100"></span>
      </div>

      <button className="flex-c-m size3 s2-txt3 how-btn1 trans-04 where1">
        {loading ? loading : "Subscribe"}
      </button>
    </form>
  );
}
