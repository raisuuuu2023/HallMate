// ==========================================
// MOCK DINING DATA
// ==========================================

const mockMenus = [
  {
    id: 1,
    date: "2026-08-24",

    breakfast: {
      items: "Paratha, Egg, Tea",
      price: 60,
    },

    lunch: {
      items: "Rice, Fish curry, Dal, Salad",
      price: 120,
    },

    dinner: {
      items: "Rice, Chicken curry, Vegetable",
      price: 130,
    },
  },

  {
    id: 2,
    date: "2026-08-25",

    breakfast: {
      items: "Bread, Omelette, Milk",
      price: 55,
    },

    lunch: {
      items: "Rice, Beef curry, Dal",
      price: 140,
    },

    dinner: {
      items: "Khichuri, Egg curry",
      price: 100,
    },
  },

  {
    id: 3,
    date: "2026-08-26",

    breakfast: {
      items: "Paratha, Vegetable, Tea",
      price: 50,
    },

    lunch: {
      items: "Rice, Chicken curry, Dal, Salad",
      price: 125,
    },

    dinner: {
      items: "Rice, Fish curry, Vegetable",
      price: 115,
    },
  },
];


// ==========================================
// STUDENT
// ==========================================

// Get today's menu
export const getTodayMenu = () => {
  const today = new Date().toISOString().split("T")[0];

  const found = mockMenus.find((menu) => menu.date === today);

  // If today's menu doesn't exist,
  // return the first available menu.
  return Promise.resolve({
    data: found || mockMenus[0],
  });
};


// Get menu by specific date
export const getMenuByDate = (date) => {
  const found = mockMenus.find(
    (menu) => menu.date === date
  );

  if (found) {
    return Promise.resolve({
      data: found,
    });
  }

  return Promise.reject({
    response: {
      data: {
        message: "No menu available for this date",
      },
    },
  });
};


// ==========================================
// ADMIN
// ==========================================

// Get all menus
export const getAllMenus = () => {
  return Promise.resolve({
    data: mockMenus,
  });
};


// Create or update menu
export const createOrUpdateMenu = (data) => {
  const existingIndex = mockMenus.findIndex(
    (menu) => menu.date === data.date
  );

  if (existingIndex >= 0) {
    // Update existing menu
    mockMenus[existingIndex] = {
      ...mockMenus[existingIndex],
      ...data,
    };

    return Promise.resolve({
      data: mockMenus[existingIndex],
    });
  }

  // Create new menu
  const newMenu = {
    id: mockMenus.length + 1,
    ...data,
  };

  mockMenus.push(newMenu);

  return Promise.resolve({
    data: newMenu,
  });
};


// Delete menu
export const deleteMenu = (id) => {
  const index = mockMenus.findIndex(
    (menu) => menu.id === id
  );

  if (index >= 0) {
    mockMenus.splice(index, 1);
  }

  return Promise.resolve({
    data: {
      success: true,
    },
  });
};