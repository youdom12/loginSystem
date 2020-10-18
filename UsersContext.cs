using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Microsoft.Extensions.Configuration;
using System.Reflection.Metadata.Ecma335;
using System.Security.Permissions;

namespace payroll_prototype.Models
{
    public class UsersContext
    {
        private string FName = "";
        private string LName = "";
        private string username = "";
        private string password = "";
        private bool valid;
        private string connectionString;
        public UsersContext(string username, string password, string connectionString)
        {
            this.connectionString = connectionString;
            using MySqlConnection connection = new MySqlConnection(connectionString);
            try
            {
                connection.Open();
            }// end try
            catch (MySqlException ex)
            {
                valid = false;
                return;
            }// end catch
            string sqlQuery = "select * from users where username='" + username + "' and password='" + password + "'";
            MySqlCommand command = new MySqlCommand(sqlQuery, connection);
            var reader = command.ExecuteReader();
            if (!reader.HasRows)
            {
                valid = false;
                return;
            }// end if
            FName = SqlQuery("select FName from users where username='" + username + "' and password='" + password + "'");
            LName = SqlQuery("select LName from users where username='" + username + "' and password='" + password + "'");
            this.username = SqlQuery("select username from users where username='" + username + "' and password='" + password + "'");
            this.password = SqlQuery("select password from users where username='" + username + "' and password='" + password + "'");
            valid = true;
        }// end UsersContext
        private string SqlQuery(string query)
        {
            using MySqlConnection connection = new MySqlConnection(connectionString);
            try
            {
                connection.Open();
            }// end try
            catch (MySqlException ex)
            {
                valid = false;
                return "";
            }// end catch
            string stringHolder = "";
            string sqlQuery = query;
            MySqlCommand command = new MySqlCommand(sqlQuery, connection);
            var reader = command.ExecuteReader();
            if (!reader.HasRows)
            {
                valid = false;
                return "";
            }// end if
            while (reader.Read())
            {
                // Display all the columns.
                for (int i = 0; i < reader.FieldCount; i++)
                {
                    stringHolder += reader.GetValue(i);
                }// end for
            }// end while
            reader.Close();
            return stringHolder;
        }// end sqlQuery
        public string GetFName() { return FName; }// end GetFName
        public string GetLName() { return LName; }// end GetLName
        public string GetUserName() { return username; }// end GetUserName
        public string GetPassword() { return password; }// end GetUserName
        public bool IsValid() { return valid; }// end isValid
    }// end UsersContext
}
