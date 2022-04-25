import React from "react";

const About = () => {
  return (
    <div className="container">
      <h1 className="my-3" style={{ color: "black" }}>
        About Us
      </h1>
      <div className="accordion" id="accordionExample" style={{ color: "black" }} >
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
                What is cloud storage?
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
            Cloud storage is off-site storage that's maintained by a third party. Cloud storage safely and securely saves your data to a remote database so you don't have to store your data and files to your computer hard drive or other storage device. <br /><br />
            Cloud storage has many advantages over hard drive storage. First, you don't have to physically possess the storage device as you would with a flash drive, for example, so you don't run the risk of losing irreplaceable data. Second, cloud storage makes it easy to share content. Just share a Dropbox folder with a coworker and they can instantly access the content within it. Another great reason to use cloud storage is the cost savings. It's much more affordable—and smart—to buy unlimited cloud storage for a nominal fee rather than buying and maintaining lots of hard drive storage space.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Access your data from multiple devices
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
            iBook offers one central hub for data storage. Whether you're at
              work or on the road, your data are accessed across your devices
              and accessible in real time. Access your iBook account with
              desktop apps on Windows and Mac, our mobile app for iOS or Android
              devices, and on the web through your browser.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Get the right amount of storage space for you
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              Need more storage space? iBook has a range of cloud storage
              solutions that will offer you the right amount of online
              storage—no matter how much you need.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
