import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Contact = ({ listing }) => {
  const [landLord, setLandLord] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`, {
          method: "GET",
        });
        const data = await res.json();
        setLandLord(data);
        console.log(landLord);
      } catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [message, setMessage] = useState("");

  const onchange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div>
      {landLord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landLord.username} </span>{" "}
            for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()} </span>
          </p>
          <textarea
            name="message"
            id="message"
            value={message}
            onChange={onchange}
            cols=""
            placeholder="enter your message here"
            className="w-full border p-3 rounded-lg "
            rows="2"
          ></textarea>
          <Link
            className="bg-slate-600 text-white mt-4 border border-red-600 text-center rounded-lg p-3"
            to={`mailto:${landLord.email}?subject=Regarding${listing.name}&body=${message}`}
          >
            Send Message
          </Link>
        </div>
      )}
    </div>
  );
};

Contact.propTypes = {
  listing: PropTypes.object.isRequired,
};

export default Contact;
