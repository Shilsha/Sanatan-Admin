
import React, { useEffect, useState } from "react";




function NextPrev() {
  const [permission, setPermission] = useState([
     { name: "Article" },
    { name: "User" },
    { name: "Queries" },
    { name: "log" },
    { name: "Hit" },
    { name: "BroadCast" },
    { name: "Blog" },
  ]);
  
  const handleChangePer = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempUser = permission.map((user) => {
        return { ...user, isChecked: checked };
      });
      setPermission(tempUser);
    } else {
      let tempUser = permission.map((user) => user.name === name ? { ...user, isChecked: checked } : user );
      setPermission(tempUser);
    
    }
    
    
};

const  tempUser2=permission.filter(item=>item.isChecked===true)
  console.log(tempUser2.map(data=>data.name),'new data')

  return (
    <div className=" my-4 ml-16 flex justify-between items-center gap-4 w-full " >
     
      
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="allSelect"
            checked={!permission.some((user) => user?.isChecked !== true)}
            onChange={handleChangePer}
          />
          <label className="form-check-label ms-2">Super Admin</label>
        </div>

        
        {permission.map((user, index) => (
          <div className="form-check" key={index}>
            <input
              type="checkbox"
              className="form-check-input"
              name={user.name}
              checked={user?.isChecked || false}
              onChange={handleChangePer}
            />
            <label className="form-check-label ms-2">{user.name}</label>
          </div>
        ))}
     
   
    </div>
  );
}

export default NextPrev;
