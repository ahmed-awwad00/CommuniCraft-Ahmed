const express = require('express');
const bodyParser = require('body-parser');

const { skill, interest } = req.query;

if (skill && interest) {
    // Select users from the database based on the provided skill and interest
    db.query(
      'SELECT * FROM users WHERE JSON_CONTAINS(CrafSkill, ?) AND JSON_CONTAINS(CrafInterest, ?)',
      [skill, interest],
      (err, results) => {
        if (err) {
          console.error('Error found users in the database:', err);
          return res.status(500).json({ error: 'Server Error' });
        }

        res.json(results);
      }
    );
}

 if (skill) {
    // Select users from the database based on the provided skill
    db.query('SELECT * FROM users WHERE JSON_CONTAINS(CrafSkill, ?)', [skill], (err, results) => {
      if (err) {
        console.error('Error fetching users from the database:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json(results);
    });
  } 

  else {
    // Return all users if no skill is specified
    db.query('SELECT * FROM users', (err, results) => {
      if (err) {
        console.error('Error fetching users from the database:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json(results);

    });}

  
    const skillMatchedUsers = results;






    
    if (skillMatchedUsers.length >= 2) {
        const groupName = `Group-${Math.floor(Math.random() * 1000) + 1}`;
        const groupId = Math.floor(Math.random() * 1000) + 1;

        // Create a new group and add users to it
        db.query(
          'INSERT INTO groups (id, name) VALUES (?, ?)',
          [groupId, groupName],
          (groupErr) => {
            if (groupErr) {
              console.error('Error creating a group:', groupErr);
              return res.status(500).json({ error: 'Internal Server Error' });
            }

            // Update user records with group information
            skillMatchedUsers.forEach((user) => {
              db.query('UPDATE users SET group_id = ? WHERE id = ?', [groupId, user.id], (updateErr) => {
                if (updateErr) {
                  console.error('Error updating user group information:', updateErr);
                  return res.status(500).json({ error: 'Internal Server Error' });
                }
              });
            });

            res.json({ message: 'Group created successfully', groupId, groupName });
          }
        );
      } else {
        res.json(skillMatchedUsers);
      }
    
      






app.get('/users', async (req, res) => {
  const { skill } = req.query;

  try {
    if (skill) {
      // Find users with the specified skill
      const userMatched = await User.find({ skills: { $in: [skill] } });
      res.json(userMatched);
    } else {
      // Return all users if no skill is specified
      const allUsers = await User.find();
      res.json(allUsers);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users.' });
  }
});

