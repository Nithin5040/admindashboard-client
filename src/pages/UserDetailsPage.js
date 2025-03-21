import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import '../styles/UserDetailsPage.css';

const UserDetailsPage = () => {
  const location = useLocation();
  const { userDetails } = location.state || {};
  const [geoLocation, setGeoLocation] = useState('Fetching...');
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [preview1, setPreview1] = useState(null);
  const [preview2, setPreview2] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [uploadStatus1, setUploadStatus1] = useState('');
  const [uploadStatus2, setUploadStatus2] = useState('');

  // ✅ Enhanced toBase64 with canvas and rotation fix
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        const img = new Image();
        img.src = event.target.result;
        img.onload = function () {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          let width = img.width;
          let height = img.height;

          const isPortrait = height > width;

          if (isPortrait) {
            canvas.width = height;
            canvas.height = width;
            ctx.translate(height, 0);
            ctx.rotate(Math.PI / 2);
            ctx.drawImage(img, 0, 0);
          } else {
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0);
          }

          resolve(canvas.toDataURL('image/jpeg'));
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGeoLocation(`Lat: ${pos.coords.latitude}, Lon: ${pos.coords.longitude}`);
        },
        (error) => {
          setGeoLocation('Location access denied or unavailable.');
          console.error('Geolocation Error:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      setGeoLocation('Geolocation is not supported.');
    }
  };

  useEffect(() => {
    if (userDetails) {
      fetchLocation();
    }
  }, [userDetails]);

  const handleImageUpload = (e, setImage, setPreview, setStatus) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setStatus('Uploaded ✅');
    }
  };

  const handleSubmit = async () => {
    const doc = new jsPDF();
    const logoUrl = '/vishvin.avif';

    const loadImage = (url) =>
      new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
      });

    const logoImg = await loadImage(logoUrl);
    if (logoImg) {
      doc.addImage(logoImg, 'JPEG', 80, 10, 50, 20);
    }

    doc.setFontSize(16);
    doc.text('User Details Submission', 70, 40);
    doc.setFontSize(12);
    doc.text(`User ID: ${userDetails.userid}`, 20, 60);
    doc.text(`Name: ${userDetails.name}`, 20, 70);
    doc.text(`Location: ${geoLocation}`, 20, 80);

    let yPos = 90;

    if (image1) {
      const imgData1 = await toBase64(image1);
      doc.text('Image 1:', 20, yPos);
      doc.addImage(imgData1, 'JPEG', 20, yPos + 5, 60, 60);
      yPos += 70;
    }

    if (image2) {
      const imgData2 = await toBase64(image2);
      doc.text('Image 2:', 20, yPos);
      doc.addImage(imgData2, 'JPEG', 20, yPos + 5, 60, 60);
    }

    const cleanName = userDetails.name.replace(/\s+/g, '');
    const fileName = `${userDetails.userid}_${cleanName}_details.pdf`;

    doc.save(fileName);
    alert('✅ PDF generated and saved offline!');
    setSubmitted(true);
  };

  return (
    <div className="user-details-page">
      <div className="user-details-card">
        <h2>{userDetails?.name}'s Details</h2>

        <div className="user-info">
          <p>
            <strong>ID:</strong> {userDetails?.userid}
          </p>
          <p>
            <strong>Location:</strong> {geoLocation}
          </p>
        </div>

        <button className="refresh-location-button" onClick={fetchLocation}>
          🔄 Refresh Location
        </button>

        <div className="image-upload-section">
          <label className={`custom-file-upload ${uploadStatus1 && 'uploaded'}`}>
            <input type="file" onChange={(e) => handleImageUpload(e, setImage1, setPreview1, setUploadStatus1)} />
            {uploadStatus1 || 'Upload Image 1'}
          </label>
          {preview1 && <img src={preview1} alt="Preview 1" className="image-small" />}

          <label className={`custom-file-upload ${uploadStatus2 && 'uploaded'}`}>
            <input type="file" onChange={(e) => handleImageUpload(e, setImage2, setPreview2, setUploadStatus2)} />
            {uploadStatus2 || 'Upload Image 2'}
          </label>
          {preview2 && <img src={preview2} alt="Preview 2" className="image-small" />}
        </div>

        <button className="proceed-button" onClick={handleSubmit}>
          Submit & Download PDF
        </button>

        {submitted && <div className="success-message">Submitted and PDF downloaded!</div>}
      </div>
    </div>
  );
};

export default UserDetailsPage;
