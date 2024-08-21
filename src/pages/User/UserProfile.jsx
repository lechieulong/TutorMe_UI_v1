import React from 'react';

function Profile() {
  return (
    <div id="root" style={rootStyle}>
      <section className="h-full bg-gradient-to-r from-pink-300 to-blue-200">
        <div className="container py-5 h-full">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-9 col-xl-8">
              <div className="card">
                {/* Profile Header */}
                <ProfileHeader />

                {/* Stats Section */}
                <StatsSection />

                {/* About Section */}
                <AboutSection />

                {/* Recent Photos Section */}
                <RecentPhotosSection />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProfileHeader() {
  return (
    <div className="rounded-t text-white flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
      <div className="ml-4 mt-5 flex flex-col" style={{ width: '150px' }}>
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
          alt="Generic placeholder image"
          className="img-fluid img-thumbnail mt-4 mb-2"
          style={{ width: '150px', zIndex: 1 }}
        />
        <button type="button" className="btn btn-outline-dark text-body" style={{ zIndex: 1 }}>
          Edit profile
        </button>
      </div>
      <div className="ml-3" style={{ marginTop: '130px' }}>
        <h5>Andy Horwitz</h5>
        <p>New York</p>
      </div>
    </div>
  );
}

function StatsSection() {
  return (
    <div className="p-4 text-black bg-gray-200">
      <div className="flex justify-end text-center py-1 text-body">
        <div>
          <p className="mb-1 text-lg font-semibold">253</p>
          <p className="text-sm text-muted mb-0">Photos</p>
        </div>
        <div className="px-3">
          <p className="mb-1 text-lg font-semibold">1026</p>
          <p className="text-sm text-muted mb-0">Followers</p>
        </div>
        <div>
          <p className="mb-1 text-lg font-semibold">478</p>
          <p className="text-sm text-muted mb-0">Following</p>
        </div>
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <div className="card-body p-4 text-black">
      <div className="mb-5 text-body">
        <p className="lead font-normal mb-1">About</p>
        <div className="p-4 bg-gray-200">
          <p className="italic mb-1">Web Developer</p>
          <p className="italic mb-1">Lives in New York</p>
          <p className="italic mb-0">Photographer</p>
        </div>
      </div>
    </div>
  );
}

function RecentPhotosSection() {
  return (
    <div className="flex justify-between items-center mb-4 text-body">
      <p className="lead font-normal mb-0">Recent photos</p>
      <p className="mb-0">
        <a href="#!" className="text-muted">
          Show all
        </a>
      </p>
    </div>
  );
}