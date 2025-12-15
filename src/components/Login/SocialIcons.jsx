let SocialIcons = () => {
  const icons = [
    { name: "facebook", color: "#3b5998", icon: "fab fa-facebook-f" },
    { name: "google", color: "#db4437", icon: "fab fa-google" },
    { name: "twitter", color: "#1da1f2", icon: "fab fa-twitter" },
  ];

  return (
    <div className="text-center mb-4">
      <h4 className="mb-4 mt-3">Login to Momen Task System With</h4>
      {icons.map((social) => (
        <button
          key={social.name}
          type="button"
          className="btn social-btn mx-2"
          style={{
            backgroundColor: social.color,
            color: "#fff",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "none",
            boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
            transition: "all 0.3s ease",
            fontSize: "18px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 8px 12px rgba(0,0,0,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.2)";
          }}
        >
          <i className={social.icon}></i>
        </button>
      ))}
    </div>
  );
};

export default SocialIcons;
