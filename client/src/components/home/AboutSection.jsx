const AboutSection = () => {
  return (
    <div className="my-container">
      <div className="flex flex-col justify-center items-center bg-white py-10 space-y-8 md:flex-row md:space-x-8">
        {/* Text Div */}
        <div className="max-w-md p-8 bg-white rounded-lg shadow-lg md:w-1/2">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About Us</h2>
          <p className="text-gray-700">
            Welcome to Revibe, your ultimate destination for the latest trends
            in fashion! At Revibe, we believe that fashion is not just about
            clothing; it's about expressing yourself, feeling confident, and
            embracing your unique style. Our mission is to provide you with a
            curated collection of high-quality fashion products that inspire and
            empower you to look and feel your best every day.
          </p>
        </div>
        {/* Image Div */}
        <div className="flex justify-center items-center md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1553531889-56cc480ac5cb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="About Us"
            className="w-64 h-64 rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
